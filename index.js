import { viewsRoot, publicRoot, express, app, expressLayout, host, port, url, cookieParser, methodOverride, morgan } from "./configs/config.js";

import pageNotFound from "./middlewares/pageNotFound.js";
import errorMiddleware from "./middlewares/error.js";
import method from "./middlewares/methodOverride.js";

import homeRouter from "./routers/home.js";
import contactsRouter from "./routers/contacts.js";

app.set("view engine", "ejs");
app.set("views", viewsRoot);
app.set("layout extractScripts", true)

app.use(expressLayout);
app.use(express.static(publicRoot));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride(method));
app.use(morgan("':method', ':url', ':status', ':response-time ms', ':date'"))

app.use('/', homeRouter);
app.use("/contacts", contactsRouter);

app.use(pageNotFound)
app.use(errorMiddleware);

app.listen(port, host, err => {
    console.log(err ? err : `Server berjalan di ${url}`);
})