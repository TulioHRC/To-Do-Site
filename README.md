# To-Do-Site

## Reasons
I need an application that save to-do lists for me, and it can't be Notion, because sometimes it's slow and I have some others things there.

## Objectives
- Pretty interface
- Easy to use
- Fast
- Can be used in PC and cellphone

## Log

### v0.8.3.1 (HotFix)
- Fixing some errors (deleted the async functions in the url callbacks, just keep in the delete JS function)
- Autofocus in the new ToDo input

### v0.8.3 (Deleting fix)
- Deleting were sometimes reloading incorrectly the window, so the itens continued the same, so I used async programming in some places to avoid this type of error.

### v0.8.2 (Error page style)
- CSS to error page
- Theme in the error page

### v0.8.1 (Little upgrades)
- CSS upgrades
- Commentaries in the code

### v0.8 (Popup full style)
- Popup style
- Popup style responsive
- To do update fix error

### v0.7.4 (Error Popup)
- Error Popup

### v0.7.3 (Basic error context saving)
- Query sending errors to redirect to the actual page with all the error data (message, text already put by user)
- Pop up start of creation

### v0.7.2 (Login system error fix)
- Register fix
- Login fix
- Created QR code

![frame](https://user-images.githubusercontent.com/62257920/139165554-8f2c37d5-5ae9-4dae-bdcf-71f12bf92022.png)

### v0.7.1 (Minor updates)
- Fix theme changing error (não está funcionando no deploy, talvez mudar a forma, só carregando o css do tema e não recarregando pagina)
- Log out button css fix
- Better home page css (less things in the screen)
- Cell switch description

### v0.7 (Complete login system style)
- Proper images for slideshow (Just basic photos, that can improve a lot in the future)
- Responsive css update

### v0.6.3 (Login system style)
- System style (slideshow only with example photos)
- Login error corrected

### v0.6.2 (Theme changing fix)
- Fix theme changing error
- Fixed error in input of to dos (0 chars accepted)
- Error page
- Pop up to create account

### v0.6.1 (Minor errors fix)
- Text position in PC
- Smaller font-size to phones and a little for PCs too
- Better theme loading (not bugging in the start)

### v0.6 (New saving method)
- Removed email of accounts (to avoid usefull data to hackers)
- Added log out feature
- Reconfigured the mongoDB collections (with ID and some others things)
- Saving without account method (cache)
- Full adaption to without account method (delete, save, etc.)

### v0.5.3 (Login system working)
- Created the register's functions and the login's functions
- Basic saving in the cookies

### v0.5.2 (Basic Login)
- Changed some things in the switch theme mode
- Created basic html of login system
- Basic cookie reading and saving (just logged cookie)

### v0.5.1 (Themes modes)
- Created dark mode

### v0.5 (Responsive CSS and HTML)
- Created the tablet css
- And the PC css
![image](https://user-images.githubusercontent.com/62257920/136080192-34d252d2-cc62-4993-ad0b-24c2b90ebb06.png)

### v0.4.2 (Minimum size)
- To do name minimum size in input

### v0.4.1 (Fixing some things)
- Fix update in checkbox click
- Fix initial line-through in checked to-dos
- Merged three styles css files into just one, to make the app faster

### v0.4 (Basic CSS)
- Basic CSS for cellphone
- Line Through in checked to-dos
![image](https://user-images.githubusercontent.com/62257920/135699204-db90a43f-d895-43e5-ae07-33ce63f04b60.png)

### v0.3.3 (Fixed update did)
- Fixed update did error

### v0.3.2 (IP fix)
- Fixed ip error

### v0.3.1 (Checkbox)
- Created checkbox for each to-do

### v0.3 (Basic Version)
- Created the way to delete to-dos

### v0.2.2 (Icon)
- Put an icon

### v0.2.1 (Mongo saving and viewing)
- Created the way to save new to-dos
- Created the way to see the to-dos by your ip

### v0.2 (MongoDB)
- Created Mongo database
- Connected to the mongo collection

### v0.1 (Organizing project)
- Created the folders and some commands in "app.js".
- Basic app (working online) with html and running code
- Deployed in heroku
