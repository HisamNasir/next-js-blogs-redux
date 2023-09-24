import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./UserReducer";
import { useRouter } from "next/router";

const Update = () => {
  const navigate = useRouter();
  // const { id } = router.query;
  // const users = useSelector((state) => state.users);
  // const user = users.find((user) => user.id === id);
  
  
  // const existingUsers = users.filter((user) => user.id === id);
  // const { name, paragraph } = user;
  // const [uname, setName] = useState(name);
  // const [uparagraph, setparagraph] = useState(paragraph);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  
  const { id } = useParams();
  const users = useSelector((state) => state.users);

  // Find the user with the matching ID
  const user = users.find((user) => user.id === id);
  
  const [uname, setName] = useState("");
  const [uparagraph, setparagraph] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  
    // useEffect(() => {
    //   if (!user) {
    //   }
    // }, [user]);
  
    // if (!user) {
    //   return <div>User not found</div>;
    // }
    useEffect(() => {
    
      if (user) {
        setName(user.name);
        setparagraph(user.paragraph);
      }
    }, [user]);
  
    const handleUpdate = (event) => {
      event.preventDefault();
      
      // Check if user is found before dispatching the update action
      if (user) {
        dispatch(
          updateUser({
            id: user.id,
            name: uname,
            paragraph: uparagraph,
          })
        );
        navigate("/");
      }
    };
  
    if (!user) {
      return <div>User not found</div>;
    }
  


  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   dispatch(
  //     updateUser({
  //       id: id,
  //       name: uname,
  //       paragraph: uparagraph,
  //     })
  //   );
  //   navigate("/");
  // };

  // useEffect(() => {
  //   // Update local state when the user prop changes (e.g., when Redux state updates)
  //   setName(user.name);
  //   setparagraph(user.paragraph);
  // }, [user]);

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={uname}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="paragraph">Paragraph</label>
          <input
            type="text" 
            name="paragraph"
            className="form-control"
            value={uparagraph}
            onChange={(e) => setparagraph(e.target.value)}
          />
        </div>
        <button className="p-4 bg-green-400" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
