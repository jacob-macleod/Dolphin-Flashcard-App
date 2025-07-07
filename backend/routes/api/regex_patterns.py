""" Contains a number of regex patterns for checking API requests are valid """

# Check if a value is in the format number.number
REVIEW_STATUS_REGEX = r"^\d+\.\d+$"

# Check a value is in dd/mm/yyyy format
DATE_REGEX = r"^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$"

# Check if a value is a positive number
NUMBER = r"^\d+$"

# See if a card status has the right information
CARD_STATUS = r"^(right|wrong|easy)$"

QUIZLET = r'<span class="s1q0b356"><span class="TermText notranslate lang-en">(.*?)</span>.*?<span class="hcszxtp"><span class="TermText notranslate lang-en">(.*?)</span>'

# Types allowed from a quest
QUEST_TYPE = r"^(cards_revised|xp_gained|time_spent)$"

# Another kind of type allowed to quests
QUEST_SUB_TYPE = r"^(monthly|friend)$"

# User invited status possibility
INVITE_STATUS = r"^(accepted|pending|declined)$"
