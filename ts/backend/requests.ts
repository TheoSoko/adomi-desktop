import fs from "fs"
import path from "path"

export const getGopher = async () => {
    const gopher = await fetch("http://localhost:8080/gopher/random")
        .catch((err) => {
            console.log(err)
            return null
        })
    if (gopher === null) {
        return {error: "idk"}
    }

    const gopherBuffer = Buffer.from(await gopher.arrayBuffer())

    const imgPath = path.join(__dirname, '../../ressources', "random.jpg")
    console.log(imgPath)


    fs.writeFile(imgPath, gopherBuffer, {}, () => {console.log("ahahaha")})
    
}