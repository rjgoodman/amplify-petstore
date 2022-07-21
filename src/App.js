import { useState } from 'react';
import './App.css';
import { 
  Pets 
} from './ui-components';
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";

import { AddPet } from "./ui-components";
import { PetDetails } from './ui-components';
import {withAuthenticator} from '@aws-amplify/ui-react';
import { Storage } from "@aws-amplify/storage"



// import PetProfile from './ui-components/PetProfile';







function App({user,signOut}) {
  
  async function saveFile() {
    await Storage.put("test.txt", "Hello");
  }
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet,setPet] = useState();

  const [updatePet,setUpdatePet] = useState();

  const [name,setName] = useState("");
  const [age,setAge] = useState("");
  const [breed,setBreed] = useState("");
  const [about,setAbout] = useState("");
  const [color,setColor] = useState("");
  const [image,setImage] = useState("");



  const formOverride2 = {

    
    Close: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowDetails(false)
      }
    }
  }
  const formOverride = {
    TextField29766922 : {
      placeholder: name
    },
    TextField29766923 : {
      placeholder: age
    },
    TextField29766924 : {
      placeholder: breed
    },
    TextField32462675 : {
      placeholder: about,
    },
    TextField32462682 : {
      placeholder: color,
    },
    TextField32462689 : {
      placeholder: image,
    },
    image: {
      src: updatePet == null ? "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      : updatePet.image,
    },

    Button32462697 : {
      isDisabled: !updatePet ? true : false
    },
    Button29766926 : {
      isDisabled: updatePet ? true : false
    },
    Icon: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowForm(false)
      }
    }
  }
  const navbarOverrides = {
    "Button" : {
      onClick: signOut,
    },
    image: {
      src: user?.attributes?.profile
      //src: "https://img.icons8.com/color/50/000000/cat",
      
    },
    "Add Pet": {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        saveFile();
        setShowForm(!showForm)
      }
    }
  }
  return (
    <div className="App">
      <NavBar width={"100%"}
      overrides={navbarOverrides}
      />
      <header className="App-header">
        { showDetails && ( <PetDetails 
        pet={pet} 
        overrides={formOverride2}
        style={{
          textAlign: "left",
          margin: "1rem"
        }} 
        />
        )

        }
      
        {showForm && (
          <AddPet 
          pet={updatePet}
          overrides={formOverride}
            style={{
              textAlign: "left",
              margin: "1rem"
            }} />
        )

        }
      
      <Pets 
        overrideItems={({item,index})=>({
          overrides: {
            Breed: {color:"blue"},
            Button29766907: {
              onClick: ()=>{
                setShowDetails(!showDetails);
                setPet(item)
              }
            },
            Button31562680: {
              onClick: ()=>{
                
                if (!showForm) setShowForm(true);
                setUpdatePet(item);
                setName(item.name);
                setAge(item.age);
                setBreed(item.breed);
                setAbout(item.about);
                setColor(item.color);
                setImage(item.image);
                
              }
            },
          },
        })}
          />
      {/* <PetProfile overrides={PetProfileOverride} /> */}

      </header>
      <Footer width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);
