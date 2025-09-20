"""Extends JWT handler to support shared folder invites
"""

import time
from database.jwt_handler import JwtHandler


class SharedFolderJwtHandler:
    """Handles JWT tokens for shared folder invitations"""
    
    def __init__(self):
        self.jwt_handler = JwtHandler()
    
    def generate_invite_token(self, shared_folder_id: str, created_by: str, expiry_days: int = None):
        """Generate a JWT token for shared folder invitation
        
        Args:
            shared_folder_id (str): The shared folder ID to encode
            created_by (str): User ID of the person creating the invite
            expiry_days (int, optional): Days until expiry. None for no expiry.
            
        Returns:
            str: JWT token for invitation
        """
        # Calculate expiry timestamp if provided
        exp = None
        if expiry_days is not None:
            exp = int(time.time()) + (expiry_days * 24 * 60 * 60)  # Convert days to seconds
        
        # Create payload for shared folder invite
        iat = int(time.time())
        payload = {
            "iss": self.jwt_handler._iss,
            "aud": "shared_folder_invite",  # Different audience for invites
            "sub": shared_folder_id,  # Subject is the shared folder ID
            "created_by": created_by,
            "invite_type": "shared_folder",
            "iat": iat
        }
        
        if exp is not None:
            payload["exp"] = exp
        
        # Use existing JWT encode functionality but with custom payload
        from authlib.jose import jwt
        return str(
            jwt.encode(self.jwt_handler._header, payload, self.jwt_handler._private_key), 
            encoding="utf-8"
        )
    
    def decode_invite_token(self, token: str):
        """Decode a shared folder invitation token
        
        Args:
            token (str): The JWT token to decode
            
        Returns:
            dict: Decoded token data or None if invalid
        """
        try:
            from authlib.jose import jwt
            from authlib.jose.errors import InvalidClaimError, DecodeError
            
            token_bytes = bytes(token, "utf-8")
            
            # Decode and validate the token
            claims_options = {
                "iss": {"essential": True, "value": self.jwt_handler._iss},
                "aud": {"essential": True, "value": "shared_folder_invite"}
            }
            decoded = jwt.decode(
                token_bytes, 
                self.jwt_handler._public_key, 
                claims_options=claims_options
            )
            decoded.validate()

            # Validate required fields
            if (decoded.get("invite_type") != "shared_folder" or 
                not decoded.get("sub") or 
                not decoded.get("created_by")):
                return None
            
            return {
                "sharedFolderId": decoded["sub"],
                "createdBy": decoded["created_by"],
                "issuedAt": decoded.get("iat"),
                "expiresAt": decoded.get("exp")
            }
            
        except (InvalidClaimError, DecodeError):
            return None
        except Exception:
            # Any other error
            return None
    
    def is_token_expired(self, decoded_token: dict):
        """Check if a decoded token is expired
        
        Args:
            decoded_token (dict): The decoded token data
            
        Returns:
            bool: True if expired, False if still valid
        """
        if "expiresAt" not in decoded_token or decoded_token["expiresAt"] is None:
            # No expiry set, token is valid
            return False
        
        return int(time.time()) > decoded_token["expiresAt"]
    
    def validate_invite_token(self, token: str):
        """Validate an invite token and return shared folder ID if valid
        
        Args:
            token (str): The JWT token to validate
            
        Returns:
            dict: Validation result with sharedFolderId if valid, error if invalid
        """
        decoded = self.decode_invite_token(token)
        
        if decoded is None:
            return {"valid": False, "error": "Invalid invite link"}
        
        if "error" in decoded:
            return {"valid": False, "error": decoded["error"]}
        
        if self.is_token_expired(decoded):
            return {"valid": False, "error": "Invite link has expired"}
        
        return {
            "valid": True,
            "sharedFolderId": decoded["sharedFolderId"],
            "createdBy": decoded["createdBy"]
        }
