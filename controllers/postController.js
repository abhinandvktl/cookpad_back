// 3

const posts = require("../models/postSchema");


// add post
exports.addPosts = async (req, res) => {
    console.log("Inside add post Function");
    const userId = req.payload;
    const image = req.file.filename;
    // console.log(recipeImage);
    const { recipename, description } = req.body;
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
exports.getallUsersPosts = async (req, res) => {
    // const searchKey = req.query.search
    // const query = {
    //     recipename: { $regex: searchKey, $options: "i" }
    // }
    try {
        // const allPost = await posts.find(query)
        const allPost = await posts.find()
        res.status(200).json(allPost)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// getuserposts
exports.getUserPosts = async (req, res) => {
    const userId = req.payload
    try {
        const userPosts = await posts.find({ userId })
        res.status(200).json(userPosts)
    } catch (err) {
        res.status(401).json(err)
    }
}

// edit post
exports.editPost = async (req, res) => {
    // get post id
    const { id } = req.params
    const userId = req.payload
    const { recipename, description, image } = req.body
    const uploadPostImage = req.file ? req.file.filename : image

    try {
        const updatePost = await posts.findByIdAndUpdate({ _id: id }, { recipename, description, image: uploadPostImage, userId }, { new: true })
        await updatePost.save()
        res.status(200).json(updatePost)
    } catch (err) {
        res.status(401).json(`Request failed Error:${err}`)
    }
}


// delete posts
exports.deletepost = async (req, res) => {

    const { id } = req.params
    try {
        const removePost = await posts.findByIdAndDelete({ _id: id })
        res.status(200).json(removePost)
    } catch (err) {
        res.status(401).json(err)
    }
}