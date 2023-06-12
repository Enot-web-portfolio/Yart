import {useState, useEffect} from "react";
import {EditorUser} from "../../../../../../core/models/editor-user";
import {UsersService} from "../../../../../../core/services/users-service";
import {useParams} from "react-router-dom";

export const useEditorUserState = () => {
  const {id} = useParams<{id: string}>();
  const [editorUser, setEditorUser] = useState<EditorUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    onDataGet()
  },[])

  async function onDataGet(){
    try{
      const user = await UsersService.getUserEdit(id ?? '');
      setEditorUser(user);
    } catch (error: unknown){

    } finally {
      setIsLoading(false);
    }
  }

  return{
    editorUser,

    isLoading,
  }
}
