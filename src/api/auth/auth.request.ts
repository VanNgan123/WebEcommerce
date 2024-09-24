import { Try } from "@mui/icons-material";
import axiosProduct from "../axiosProduct";
import axiosUser from "../axiosUser";

interface UserLognin {
    email:string;
    password:string;
}

export const logninRequest = async(payload:UserLognin)=>{
    try{
        const response:any[] = await axiosUser.get("/users");
        const user = response.find((user)=> user.email === payload.email && user.password === payload.password);

        if(user){
            return user;
        }

        return null;

    }catch(error){
        return null ;
    }
}


