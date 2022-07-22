export const constants = {

    imageType: ['image/jpg', 'image/jpeg', 'image/png'],
    PATTERNS: {
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
        gst: '\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}',
        pan: '/([A-Z]){5}([0-9]){4}([A-Z]){1}$/'

    },
    types: [{ title: 'Web', value: 'web' }, { title: 'App', value: 'app' }, { title: 'Both', value: 'both' }],
    links: [
        { value: 'none', title: 'None', checked: true },
        { value: 'course', title: 'Course', checked: false },
        { value: 'print_text', title: 'Text', checked: false },
        { value: 'external_link', title: "External Link", checked: false }
    ]

};
