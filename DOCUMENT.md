# Document

Document for schemas

## API

`GET /bikes`

- Return a list of bikes
- Parameters:
  - limit: number, limit number of bikes to return
  - offset: number, skip the first n bikes
  - model: string, filter bikes with the specified model
  - priceSort: "asc" or "desc", sort the bikes list in the representative order of price
    - otherwise if exists, produce a bad request
  - ratesSort: "asc" or "desc", sort the bikes list in the representative order of ratings
    - otherwise if exists, produce a bad request

## Types

Bike: object containing data about a motorbike

```json
{
  "id": "string",
  "plateNo": "string",
  "model": "string",
  "description": "string",
  "providerId": "string",
  "providerName": "string",
  "price": "number",
  "accessories": "Accessory[]",
  "ratings": "numbers",
  "comments": "Comment[]"
}
```

Accessory: an item that can be optinally come with the bike that provides convenience

```json
{
  "id": "string",
  "name":
}
```
