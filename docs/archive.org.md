# How to format an archive.org request

## BASE_URL

```
https://archive.org/advancedsearch.php
```

## Query params

**query**

```js
q=SciFi_Horror
// understood as:
// (((title:SciFi_Horror^100 OR salients:SciFi_Horror^50 OR subject:SciFi_Horror^25 OR description:SciFi_Horror^15 OR collection:SciFi_Horror^10 OR language:SciFi_Horror^10 OR text:SciFi_Horror^1) AND !indexflag:(uncurated OR favorites OR users))^10000 OR ((title:SciFi_Horror^100 OR salients:SciFi_Horror^50 OR subject:SciFi_Horror^25 OR description:SciFi_Horror^15 OR collection:SciFi_Horror^10 OR language:SciFi_Horror^10 OR text:SciFi_Horror^1) AND indexflag:(uncurated OR favorites OR users))^0.00001)

// to limit search to a collection name
q=collection:(SciFi_Horror)

// to limit search to a title
q=title:(SciFi_Horror)
```

**output format**

`output=json`

**all fields**

- avg_rating
- backup_location
- btih
- call_number
- collection
- contributor
- coverage
- creator
- date
- description
- downloads
- external-identifier
- foldoutcount
- format
- genre
- identifier
- imagecount
- indexflag
- item_size
- language
- licenseurl
- mediatype
- members
- month
- name
- noindex
- num_reviews
- oai_updatedate
- publicdate
- publisher
- related-external-id
- reviewdate
- rights
- scanningcentre
- source
- stripped_tags
- subject
- title
- type
- volume
- week
- year

**sorting**

```
sort[]=
```

**limitations**

```
rows=50&page=1
```
