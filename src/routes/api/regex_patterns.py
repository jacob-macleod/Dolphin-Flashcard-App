""" Contains a number of regex patterns for checking API requests are valid """
REVIEW_STATUS_REGEX = r'^\d+\.\d+$'
REVIEW_STATUS_JSON = '^\\d+\\.\\d+$'

DATE_REGEX = r'^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$'
DATE_JSON = '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$'
