import express from "express"
import fs from "fs"; //modulo que permite trabajar con archivos dentro de la misma carpeta del programa
import bodyParse from "body-parser"

const app = express()
app.use(bodyParse.json())

// funcion de leer
const readData =() =>{
    try{ //que intente ejecutar la siguiente accion
    const data = fs.readFileSync("./db.json") //readFileSync para leer los datos y continuar con la ejecucion del programa
    return JSON.parse(data) // manipula y muestra los datos que acaba de leer (los muestra en la terminal) 
    } catch (error) { //que muestre por pantalla cuando de un error
        console.log(Error);
    }
}

//funcion de escribir
const writeData = (data) => {
    try{ 
        fs.writeFileSync("./db.json", JSON.stringify(data)) // que traiga los datos ya leidos para poder agregar mas
        } catch (error) {
            console.log(error);
        }
}

app.get("/", (req,res) => {
    res.send("I am the storm that is aproching")
})

//llama a los datos para mostrar los objetos y la propiedad por pantalla (/Juegos)
app.get("/Juegos",(req, res) => {
    const data = readData()
    res.json(data.Juegos)
})

//para llamar a los objetos mediante su id (poner / y el numero del id que buscamos en la barra donde desta la URL)
app.get("/Juegos/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const Juego = data.Juegos.find((Juego) => Juego.id === id)
    res.json(Juego)
})

//para agregar mas objetos a mi base de datos
app.post("/Juegos", (req, res) =>{
    const data = readData()
    const body = req.body
    const newJuego = {
        id: data.Juegos.length + 1,
        ...body //para que complete con lo que tienen los demas objetos
    }
    data.Juegos.push(newJuego)
    writeData(data)
    res.json(newJuego)
})

//para actualizar la informacion de los objetos de la base de datos
app.put("/Juegos/:id", (req, res) => {
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id)
    const juegoIndex = data.Juegos.findIndex((juego) => juego.id === id)
    data.Juegos[juegoIndex] = {
        ...data.Juegos[juegoIndex],
        ...body
    }
    writeData(data)
    res.json({ message: "Juego actualizado correctamente"})

})

//para borrar uno de los objetos de la  base de datos
app.delete("/Juegos/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const juegoIndex = data.Juegos.findIndex((juego) => juego.id === id)
    data.Juegos.splice(juegoIndex, 1)
    writeData(data)
    res.json({ message: "Juego eliminado correctamente"})
})

app.listen(3000, () => {
    console.log("Conexion correcta")
})