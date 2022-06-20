'use strict';

/**
 *  course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course', ({strapi}) => ({
    //Create event with linked user
    async create(ctx) {
        console.log(ctx)
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          data.user = ctx.state.user.id;      
          entity = await strapi.services.courses.create(data, { files });
        } else {
          ctx.request.body.user = ctx.state.user.id;
          entity = await strapi.services.courses.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.courses });
      },

      //Update user event
      async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
    
        const [courses] = await strapi.services.courses.find({
          id: ctx.params.id,
          'user.id': ctx.state.user.id,
        });
    
        if (!courses) {
          return ctx.unauthorized(`You can't update this entry`);
        }
    
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.courses.update({ id }, data, {
            files,
          });
        } else {
          entity = await strapi.services.courses.update({ id }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.courses });
      },

      //Delete a user event
      async delete(ctx){
        const {id} = ctx.params;
        const[courses] = await strapi.services.courses.find({
            id: ctx.params.id,
            "user.id": ctx.state.user.id,
        });
        if(!courses){
            return ctx.unauthorized(`You can't update this entry`);
        }
        const entity = await strapi.services.courses.delete({id});
        return sanitizeEntity(entity, {model: strapi.model.courses})
      },

    async me(ctx) {
        const user = ctx.state.user.id
        if(!user){
            return ctx.badRequst(null, [
                {messages: {id : "No authorization header was found"}}
            ])
        }

        const data = await strapi.service['course'].find({user})

        if(!data){
            return ctx.notFound()
        }

        return sanitizeEntity(data, {model: strapi.models.courses})
    }
})
);
