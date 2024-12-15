# Model

```ts
{
  _id: ObjectId
  name: string
  email: string
  password: string
  photo?: string
  createdAt: Date
  updatedAt: Date
}
```

# 🌍 POST `/users`

## Request Body

```ts
{
  name: string
  email: string
  password: string
}
```

## Response Body

```ts
{
  message: 'user registered successfully'
}
```

## Description

- Register a new user
- Email must not be registered before

# 🔒 GET `/users`

## Response Body

```ts
{
  user: {
    _id: ObjectId
    name: 'rituraj shakti'
    email: 'riturajshakti@gmail.com'
    createdAt: '2024-08-27T14:28:53.627+00:00'
    updatedAt: '2024-08-27T14:28:53.627+00:00'
  }
}
```

## Description

- Returns the user profile details

# 🔒 PATCH `/users`

## Request Body

```ts
{
  name?: string
  email?: string
  password?: string
}
```

## Response Body

```ts
{
  message: 'user updated successfully'
  user: {
    _id: ObjectId
    name: 'rituraj shakti'
    email: 'riturajshakti@gmail.com'
    createdAt: '2024-08-27T14:28:53.627+00:00'
    updatedAt: '2024-08-27T14:28:53.627+00:00'
  }
  token?: 'a8a6a8aa6ds99f97f7v'
}
```

## Description

- Update user details
- If `email` is given, then it must be unique
- If `password` is changed, then new token is returned which frontend needs to save immediately

# 🔒 PUT `/users/photo`

## Request Body (Form Data)

```ts
{
  photo: Image
}
```

## Response Body

```ts
{
  user: {
    _id: ObjectId
    name: 'rituraj shakti'
    email: 'riturajshakti@gmail.com'
    photo?: '/uploads/photo.jpg'
    createdAt: '2024-08-27T14:28:53.627+00:00'
    updatedAt: '2024-08-27T14:28:53.627+00:00'
  }
}
```

## Description

- Uploads user profile photo

# 🔒 DELETE `/users/photo`

## Response Body

```ts
{
  message: 'photo deleted successfully'
}
```

## Description

- Uploads user profile photo
