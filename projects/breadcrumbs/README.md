# Breadcrumbs  
npm i et-ng-breadcrumbs  
## Example  

```ts
    {
        path: 'subject/:id',
        component: SubjectComponent,
        data: {
            breadcrumbs: {
                label: (data: Data) => data.subject?.name
            }
        },
        resolve:{
            subject: SubjectResolver
        }
    }
```
