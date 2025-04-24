# User file

This file is a temporary solution for a database. It contains all of the user's information, like name, entries, and other preferences.

## Structure of user file

```json
"user": {
    "name": string,
    "id": string,
    "preferences": {
        ...
    },
    "entries": [
        ...
    ]
}
```

## Structure of an entry

```json
{
    "date": string (JS DateString),
    "privacy": boolean,
    "basicMood": string,
    ... (optional log types)
}
```

An entry has optional log types. The log types are currently as follows:

* `basicMood` (required)
* `note`