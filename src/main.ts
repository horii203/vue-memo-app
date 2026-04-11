import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

createApp(App).mount("#app");
