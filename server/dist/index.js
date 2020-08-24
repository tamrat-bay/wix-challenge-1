"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const carsRouter_1 = __importDefault(require("./routes/carsRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const app = express_1.default();
const Port = process.env.PORT || 5000;
app.use(express_1.default.json());
dotenv_1.config();
const mongoURL = process.env.DB_URL || "localhost";
mongoose_1.default
    .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err));
app.use("/cars", carsRouter_1.default);
app.use("/users", usersRouter_1.default);
if (process.env.NODE_ENV === "production") {
    const buildPath = path_1.default.join(__dirname, "..", "..", "client", "build");
    app.use(express_1.default.static(buildPath));
    // --- handle unknown route
    app.get("*", (req, res) => {
        const indexHtmlPath = path_1.default.join(buildPath, "index.html");
        res.sendFile(indexHtmlPath);
    });
}
else {
    console.log("Development Mode");
}
app.listen(Port, () => console.log(`Server is listening on port: ${Port}`));
