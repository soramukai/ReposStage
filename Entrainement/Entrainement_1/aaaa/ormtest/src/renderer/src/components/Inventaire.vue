<template>
  <div id="inventaire">
    <table id="tab">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>qte</th>
                <th>Image</th>
                <th>Supprimer</th>
                <th>Modifier</th>
            </tr>
            <tr id="info">
                <th><button id="add" disabled @click="ajouterItem">Ajouter</button></th>
                <th><input type="text" id="name"  @input="handleInputChange"></th>
                <th><input type="text" id="desc"  @input="handleInputChange"></th>
                <th><input type="text" id="qte"   @input="handleInputChange"></th>
                <th><input type="text" id="image" @input="handleInputChange"></th>
                <th>//</th>
                <th>//</th>
            </tr>
        </thead>
        <tbody id="tbody">
            
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
//@ts-nocheck
import { Item } from '../../model/Item.ts';
export default {
    name:'Inventaire',
    data() {
        return{
            data:[],
            trCallBack:null,
            trCallBack2:null
        }
    },
    async mounted() {
        this.data = await JSON.parse(await this.loadData())
        this.generateTable();
        let ddd = await window.electron.ipcRenderer.invoke('electron:LoadOneData',)
  },
  methods: {
    async loadData() { 
      try {
        // Charger les données avec IPCRenderer
        return await window.electron.ipcRenderer.invoke('electron:LoadData');
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    generateRow(row){
        let tr = document.createElement('tr')
        tr.appendChild(this.generateCell(row["id"]))
        tr.appendChild(this.generateCell(row["name"]))
        tr.appendChild(this.generateCell(row["description"]))
        tr.appendChild(this.generateCell(row["qte"]))
        tr.appendChild(this.generateCell(row["urlImage"]))

        let buttonSupp = document.createElement("button")
        buttonSupp.textContent="Supprimer"
        buttonSupp.addEventListener("click",()=>{
            try{
                if(window.electron.ipcRenderer.invoke('electron:DeleteRow',parseInt(tr.children[0].innerHTML))){
                    console.log("L'item a bien été supprimé")
                    tr.remove()
                }
            }catch(err){
                console.error("Probleme dans la supression de la ligne: ",err)
            }
        })
        let cellsupp = document.createElement("td")
        cellsupp.appendChild(buttonSupp)
        tr.appendChild(cellsupp)
        let buttonUpdate = document.createElement("button")
        buttonUpdate.textContent="Modifier"
        ///////////////////////////////////////////////////
        this.trCallBack =()=>{
            this.updateRowFunction(tr)
        }
        buttonUpdate.addEventListener("click",this.trCallBack);

        let cellUpdate = document.createElement("td")
        cellUpdate.appendChild(buttonUpdate)
        tr.appendChild(cellUpdate)
        ///////////////////////////////////////////////////
        return tr
    }
    ,
    updateRowFunction(_tr){
        try{            
            let childTr = _tr.children
            childTr[6].removeEventListener('click',this.trCallBack);
            this.trCallBack=()=>{
                this.updateRowValidateFunction(_tr)
            }
            for(let i = 1;i<childTr.length-2;i++){
                let valueTemp = childTr[i].innerHTML
                childTr[i].innerHTML="" 
                let input = document.createElement('input')
                input.setAttribute('type','text')
                input.value=valueTemp
                childTr[i].appendChild(input)    
            }
            let button=document.createElement("button");
            button.textContent="Valider"
            button.addEventListener('click',this.trCallBack)
            childTr[6].innerHTML=""
            childTr[6].appendChild(button)
            //childTr[6].addEventListener('click',this.trCallBack)
        }catch(err){
            console.error("Probleme avant modification: ",err)
        }
    },
    updateRowValidateFunction(_tr){
        try{
            let childTr = _tr.children
            console.log(childTr)
            childTr[6].removeEventListener('click',this.trCallBack);
            this.trCallBack=()=>{
                this.updateRowFunction(_tr)
            }
            for(let i = 1;i<childTr.length-2;i++){
                let valueTemp = childTr[i].children[0].value
                childTr[i].innerHTML=valueTemp 
            }

            let it=new Item()
            it.nom
            =childTr[1].innerHTML
            it.desc=childTr[2].innerHTML  
            it.qte=childTr[3].innerHTML
            it.urlImage=childTr[4].innerHTML
            let itJson= JSON.stringify(it)
            window.electron.ipcRenderer.send('electron:UpdateData',itJson,parseInt(childTr[0].innerHTML))
            
            let button = document.createElement('button')
            button.textContent="Modifier"
            button.addEventListener('click',this.trCallBack)
            childTr[6].innerHTML=""
            childTr[6].appendChild(button)
          }catch(err){
              console.error("Probleme dans la modification de la ligne: ",err)
          }
    }
    ,
    generateCell(value){
        let td = document.createElement('td');
        td.textContent=value
        return td;
    },
    async generateTable(){
        let tbody = document.getElementById("tbody")
        this.data= await JSON.parse(await this.loadData());
        for(let row of this.data){
            tbody.appendChild(this.generateRow(row))
        }
    },
    ajouterItem(){
        try{
            let item = new Item();
            item.nom=document.getElementById("name").value
            item.desc=document.getElementById("desc").value
            item.qte=parseInt(document.getElementById("qte").value)
            item.urlImage=document.getElementById("image").value
            let itemJson = JSON.stringify(item)
            window.electron.ipcRenderer.send('electron:SaveData',itemJson);
        }catch(err){
            console.error('Erreur lors de la sauvegarde des données :', error);
        }
        document.getElementById("tbody").innerHTML="";
        setTimeout(() => {
            this.generateTable();
        }, 20);
    },
    handleInputChange() {
        if(document.getElementById("name").value.trim().length != 0 &&
        document.getElementById("desc").value.trim().length != 0 &&
        document.getElementById("qte").value.trim().length != 0 &&
        document.getElementById("image").value.trim().length != 0)
        {
            document.getElementById("add").disabled=false;
        }
        else{
            document.getElementById("add").disabled=true;
        }
    }
  }
}
</script>

<style lang="scss">
    #inventaire{
        table{
            border-collapse: collapse;
            th{
                border: 2px solid black;
            }
            td{
                border: 2px solid black;
            }
        }
    }
</style>