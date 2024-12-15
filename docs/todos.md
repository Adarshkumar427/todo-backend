# Model

```ts
{
  _id: ObjectId
  task: string
  done: boolean
  user: ObjectId('User')
  createdAt: Date
  updatedAt: Date
}
```

# 🔒 GET `/todos`

## Request Query

```ts
{
  limit?: '10'
  page?: '1'
  search?: 'abc'
}
```

## Response Body

```ts
{
  todos: [
    {
      _id: '66cdb875873c00170d5bbaf6'
      task: 'Goto gym'
      done: false
      user: '66a9d7d25ddf87a38d80b4ba'
      createdAt: '2024-08-27T14:28:53.627+00:00'
      updatedAt: '2024-08-27T14:28:53.627+00:00'
    },
    {
      _id: '66cdb875873c00170d5bbabc'
      task: 'Fix keyboard'
      done: false
      user: '66a9d7d25ddf87a38d80b4ba'
      createdAt: '2024-08-27T14:28:53.627+00:00'
      updatedAt: '2024-08-27T14:28:53.627+00:00'
    },
  ]
  count: 45
}
```

## Description

- Returns the list of all todos with pagination

# 🔒 GET `/todos/:id`

## Response Body

```ts
{
  todo: {
    _id: '66cdb875873c00170d5bbaf6'
    task: 'Goto gym'
    done: false
    user: '66a9d7d25ddf87a38d80b4ba'
    createdAt: '2024-08-27T14:28:53.627+00:00'
    updatedAt: '2024-08-27T14:28:53.627+00:00'
  }
}
```

## Description

- Returns the details of that particular todo
- User must belong to that todo

# 🔒 POST `/todos`

## Request Body

```ts
{
  task: string
}
```

## Response Body

```ts
{
  todo: {
    _id: '66cdb875873c00170d5bbaf6'
    task: 'Goto gym'
    done: false
    user: '66a9d7d25ddf87a38d80b4ba'
    createdAt: '2024-08-27T14:28:53.627+00:00'
    updatedAt: '2024-08-27T14:28:53.627+00:00'
  }
}
```

## Description

- Creates a new todo

# 🔒 PATCH `/todos/:id`

## Request Body

```ts
{
  task?: 'Goto school to pickup kid'
  done?: false
}
```

## Response Body

```ts
{
  message: 'todo updated successfully'
}
```

## Description

- Update todo details
- User must belong to that todo

# 🔒 DELETE `/todos/:id`

## Response Body

```ts
{
  message: 'todo deleted successfully'
}
```

## Description

- Delete the given todo
- User must belong to that todo
