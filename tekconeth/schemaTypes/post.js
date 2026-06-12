export default {
    name: 'post',
    type: 'document',
    title: 'Blog Post',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'mainImage',
            type: 'image',
            title: 'Main Image',
            options: { hotspot: true }
        },
        {
            name: 'body',
            type: 'text',
            title: 'Body Text'
        }
    ]
}