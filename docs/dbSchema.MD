# Schema Breakdown for [Firebase Realtime Database](https://ses2b-group2.firebaseio.com/)

NoSQL databases represent each entry as documents/objects/references. Simply put every entry needs to have a key:value pair, much like JSON formatting.
While you may observe a slight difference in the schema layout in the Firebase console, it will ultimately be a formatted version of the schema detailed below.

```json
{
    "groups": 
    {
        "group-id-#": 
        {
            "name": "group-name",
            "maxMembers": 123,
            "maxSubGroups": 123,
            "...group-attribute": "...group-attribute value",
            "members": 
            {
                "user-id#-UID":
                {
                    "displayName": "display-name",
                    "groupAccess": "Admin/User"
                },
                "user-id#-UID": 
                {
                    "...": "...",
                    "...": "..."
                },
                "...": "..."
            },
            "chats": 
            {
                "chat-id#": 
                {
                    "content": "abcd",
                    "timestamp": "Time as per JS Function => Date.now()",
                    "user-id#-UID": "User ID of the message author"
                },
                "chat-id#":
                {
                    "...": "...",
                    "...": "..."
                },
                "...": "..."
            },
            "subGroups": 
            {
                "subGroup-id-#": 
                {
                    "name": "group-name",
                    "maxMembers": 123,
                    "...subGroup-attribute": "...subGroup-attribute value",
                    "members": 
                    {
                        "user-id#-UID":
                        {
                            "displayName": "display-name",
                            "groupAccess": "Admin/User"
                        },
                        "user-id#-UID": 
                        {
                            "...": "...",
                            "...": "..."
                        },
                        "...": "..."
                    },
                    "chats": 
                    {
                        "chat-id#": 
                        {
                            "content": "abcd",
                            "timestamp": "Time as per JS Function => Date.now()",
                            "user-id#-UID": "User ID of the message author"
                        },
                        "chat-id#":
                        {
                            "...": "...",
                            "...": "..."
                        },
                        "...": "..."
                    }
                },
                "subGroup-id-#": 
                {
                    "...": "...",
                    "...": "..."
                },
                "...": "..."
            }
        },
        "group-id-#": 
        {
            "...": "...",
            "...": "..."
        },
        "...": "..."
    },
    "users": {
        "user-id#-UID":
        {
            "?name": "User's Display Name", //'?' denotes the field is optional (absent for Github/Google Login/Registration)
            "email": "User's Email-ID",
            "groups": 
            {
                "group-id-#": 
                {
                    "displayName": "display-name",
                    "groupAccess": "Admin/User",
                    "subGroups": 
                    {
                        "subGroup-id-#": 
                        {
                            "groupAccess": "Admin/User"
                        },
                        "subGroup-id-#": 
                        {
                            "...": "..."
                        },
                        "...": "..." 
                    }
                },
                "group-id-#": 
                {
                    "...": "...",
                    "...": "..."
                },
                "...": "..."
            },
            "personalChats": 
            {
                "user-id#-UID": 
                {
                    "chat-id#": 
                    {
                        "content": "abcd",
                        "timestamp": "Time as per JS Function => Date.now()",
                        "direction": "Sent/Received"
                    },
                    "chat-id#":
                    {
                        "...": "...",
                        "...": "..."
                    },
                    "...": "..."
                },
                "user-id#-UID": 
                {
                    "...": "...",
                    "...": "..."
                },
                "...": "..."
            }
        },
        "user-id#-UID": 
        {
            "...": "...",
            "...": "..."
        },
        "...": "..."
    }
    
}
```
