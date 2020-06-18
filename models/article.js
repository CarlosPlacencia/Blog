const mongoose = require( 'mongoose' );
const marked = require( 'marked' );
const slugify = require( 'slugify' );
const createDomPurify = require( 'dompurify' );
const { JSDOM } = require( 'jsdom' );
const dompurify = createDomPurify(new JSDOM().window)

let articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    markdown: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    imageType:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }

})

articleSchema.pre('validate', function(next) {
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true});
    }

    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
});

articleSchema.virtual('imagePath').get(function(){
    if(this.image != null && this.imageType != null){
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
})

module.exports = mongoose.model( 'Article', articleSchema);