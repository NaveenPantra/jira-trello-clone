import {generateRandomString} from "../utils/helpers";

let IDS = [];
for (let i = 0; i < 12; i++) {
    IDS.push(generateRandomString());
}

const INITIAL_TASKS_LIST = {
    '🔖📕 Design': {
        name: '🔖📕 Design',
        tasks: IDS.slice(0, 3),
    },
    '🤔🤔 TODO': {
        name: '🤔🤔 todo',
        tasks: IDS.slice(3, 6),
    },
    '👨‍💻🖥️👩‍💻 Development': {
        name: '👩‍💻🖥️👩‍💻 Development',
        tasks: IDS.slice(6, 9),
    },
    '📱💻🖥️ QA': {
        name: '📱💻🖥️ QA',
        tasks: IDS.slice(9),
    },
    "👦🏻👧🏻 UAT 👴🏼👩🏼‍💼👨🏼‍🚀": {
        name: "👦🏻👧🏻 UAT 👴🏼👩🏼‍💼👨🏼‍🚀",
        tasks: [],
    },
    '👍👍 Ready For Release': {
        name: '👍👍 Ready For Release',
        tasks: [],
    },
    '✔️✔️Done 🎉🥳': {
        name: '✔️✔️Done 🥳🥳',
        tasks: [],
    },
};

const INITIAL_TASKS = {
    [IDS[0]]: {
        ID: IDS[0],
        taskText: "📂📁 File Explorer: https://file-exp.netlify.app/ 🗄️🗄️",
        isEditing: false
    },
    [IDS[1]]: {
        ID: IDS[1],
        taskText: "📊🧠📊 Sorting Algorithms Visualiser: https://sorting-vis.netlify.app/ 👨🏼‍🚀🤲❤️ 🧡 💛 💚 💙 💜 🖤 ",
        isEditing: false
    },
    [IDS[2]]: {
        ID: IDS[2],
        taskText: "📱⏲📲📳 Improved Perceived Performance of App: https://news-ipp.netlify.app/",
        isEditing: false
    },
    [IDS[3]]: {
        ID: IDS[3],
        taskText: "🎰🎮🎰 Tic Tac Toe: https://tic-tac-toe-js.netlify.com/ 🤹🏻🤹‍",
        isEditing: false
    },
    [IDS[4]]: {
        ID: IDS[4],
        taskText: " 📃📄 News Feed Template: https://newsfeedtemplate.netlify.app/",
        isEditing: false
    },
    [IDS[5]]: {
        ID: IDS[5],
        taskText: "🍺🍾🍺 Park Avenue Beer Shampoo: https://codepen.io/NaveenPantra/pen/daMyRM",
        isEditing: false
    },
    [IDS[6]]: {
        ID: IDS[6],
        taskText: "🛤️〽️ Order Tracking: https://codepen.io/NaveenPantra/pen/gOONZXo",
        isEditing: false
    },
    [IDS[7]]: {
        ID: IDS[7],
        taskText: "🌳🌳 Comment/Tree Widget: https://codepen.io/NaveenPantra/pen/OJyPMxe",
        isEditing: false
    },
    [IDS[8]]: {
        ID: IDS[8],
        taskText: "🍌🍌 SnackBar: https://codepen.io/NaveenPantra/pen/bGdJYNp",
        isEditing: false
    },
    [IDS[9]]: {
        ID: IDS[9],
        taskText: "📧📧 Email Client: https://codepen.io/NaveenPantra/pen/XWmbROP",
        isEditing: false
    },
    [IDS[10]]: {
        ID: IDS[10],
        taskText: "🐨🖱️🐨 Animated Button: https://codepen.io/NaveenPantra/pen/VgvbPw",
        isEditing: false
    },
    [IDS[11]]: {
        ID: IDS[11],
        taskText: "🙏🏼🙏🏼 Lets Connect on LinkedIN 🙏🏼🙏🏼  https://www.linkedin.com/in/naveenpantra/",
        isEditing: false
    },
};

export {INITIAL_TASKS_LIST, INITIAL_TASKS};
