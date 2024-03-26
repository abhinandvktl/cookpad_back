// 3

const posts = require("../models/postSchema");


// add post
exports.addPosts = async (req, res) => {
    console.log("Inside add post Function");
    const userId = req.payload;
    const image = req.file.filename;
    // console.log(recipeImage);
    const { recipename, description } = req.body;
    // console.log(`${userId} , ${recipename}, ${make} , ${recipeImage}`);
    try {

        // finding if same post is uploaded
        const existingPosts = await posts.findOne({ description });
        console.log(existingPosts);
        if (existingPosts) {
            res.status(406).json(`Recipe already  Exists!! Uploads another`);
        } else {
            const newPosts = new posts({
                userId, recipename, description, image
            })
            await newPosts.save()
            res.status(200).json(newPosts)
        }
    } catch (err) {
        res.status(401).json(`Request Failed,Error : ${err} `);
    }
};



// get all post

exports.getAllPostController = async (req, res) => {
    try {
        const allPost = await postdata.find()
        res.status(200).json(allPost)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

