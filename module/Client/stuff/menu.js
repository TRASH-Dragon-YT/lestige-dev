module.exports = class DiscordButton {
    constructor(){
        this.menu = {};
        
        this.menu.type = 3;
    }

    getJSON(){
        
        
        return [this.menu];
    }

    setId(id){
        if(!id){
            throw new Error('Discordly: You must provide a custom ID;');
        }
     this.menu.custom_id = id;
     
     return this;
    }
    
    setPlaceholder(placeholder){
     if(!placeholder){
         throw new Error('You must set a placeholder!');
     }
     
     this.menu.placeholder = placeholder;

     return this;
    }


      
    addOption(label, menuOptions = {}){
         this.emoji = {}
         this.default = false
        if(!label){
            throw new Error('[Discordly]: You must add a label!')
        }
        if(!menuOptions){
            throw new Error('[Discordly]: You must add menu options!')
        }if(menuOptions && !menuOptions.description){
            throw new Error('[Discordly]: You must add a description!')
        }if(menuOptions && !menuOptions.value){
            throw new Error('[Discordly]: You must add a value!')
        }if(menuOptions.emoji){
            if(!menuOptions.emoji.name){
                throw new Error('[Discordly]: You must add a emoji!')
            }
             if(!menuOptions.emoji.id && typeof(menuOptions.emoji.name) !== "string"){
                this.emoji.id = null
            }else if(!menuOptions.emoji.id && typeof(menuOptions.emoji.name) == "string"){
                throw new Error('[Discordly]: You must add a emoji id!')
            }
            if(this.emoji.id !== null){
                this.emoji.id = menuOptions.emoji.id
            }
            this.emoji.name = menuOptions.emoji.name
            
        }if(menuOptions && !menuOptions.default){
            this.default = false
        }else{
            this.default = menuOptions.default
        }

        

       this.options2 = []
        
    

        this.options2.push({
         label: label,
         value: menuOptions.value,
         description: menuOptions.description,
         default: this.default,
         emoji: {
             name: this.emoji.name,
             id: this.emoji.id
         },
        });

        this.options2.forEach(option => {
            this.menu.option = []

            this.menu.option.push({
                label: option.label,
                value: menuOptions.value,
                description: menuOptions.description,
                default: this.default,
                emoji: {
                    name: this.emoji.name,
                    id: this.emoji.id
                },
            })
        })


        return this;
    };

      setDisabled(boolean){
        if(!boolean){
        this.menu.disabled = true
        }if(boolean == false){
           this.menu.disabled = false   
        }if(boolean == true){
           this.menu.disabled = true   
        }
   
        return this
       }


}