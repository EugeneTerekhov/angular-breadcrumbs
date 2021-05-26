# Breadcrumbs
## Example

```ts
    {
        path: 'subject/:id',
        component: SubjectComponent,
        data: {
            breadcrumbs: {
                label: (data: Data) => data.subject.name
            }
        },
        rsolve:{
            subject: SubjectResolver
        }
    }
```


