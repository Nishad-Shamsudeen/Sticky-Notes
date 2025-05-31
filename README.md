## 🗒️ Sticky Notes App
A dynamic and interactive sticky notes web application built using React.js. This app allows users to create, edit, drag, archive, search, and manage sticky notes on a digital board with persistent storage using localStorage.

## 🚀 Setup Instructions
Step-by-Step
Clone the repository
git clone https://github.com/Nishad-Shamsudeen/Sticky-Notes.git
cd Sticky-Notes

 ## ChatGPT Integration – Add Note & Drag-and-Drop Functionality
1. ## Add Note Functionality
ChatGPT helped design the dynamic creation and setup of editable sticky notes using contentEditable divs. Key features implemented:

Dynamic ref assignment for each sticky note using editorRef

Ensures el.innerText is set only once during initial render to avoid unintentional overwrites

Real-time content update tracking with the onInput event

2. ## 🖱️ Drag-and-Drop Functionality
ChatGPT was also used to assist in implementing intuitive drag-and-drop support for sticky notes. This includes:

Managing note positions to improve user interaction

Updating state to persist the new position after drop

This enhanced the UX by allowing users to freely organize their notes within the interface.