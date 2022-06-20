"use-strict";

module.exports = {
    routes:[
        {
            "method": "GET",
            "path": "/course/me",
            "handler": "course.me",
            "config":{
                "policies": []
            }
        },
    ]
}