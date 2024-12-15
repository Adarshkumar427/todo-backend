# Important Points

- The emoji 🌍 means global API
- The emoji 🔒 means an API which requires user to be logged-in (It requires token in request header)
- In case of API which requires token, here is how to send token in API request header:

```ts
// syntax
{
  authorization: 'Bearer <token>'
}

// example:
{
  authorization: 'Bearer abc867364723fbf6sd6v9v'
}
```

# Status Codes

- **200:** success
- **201:** created successfully

- **400:** validation failed
- **401:** authentication/authorization failed
- **403:** permission denied
- **404:** not found
- **405:** route not implemented
- **409:** conflict

- **500:** server error