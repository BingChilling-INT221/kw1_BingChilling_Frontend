const accesstoken = localStorage.getItem('accesstoken');
const refreshtoken = localStorage.getItem('refreshtoken');
export const fetched_api = async ( role,category, mode, page, pageSize) => {
    console.log("fetched_api")
    try {
      const selectCategory = (() => {
        return category !== "" ? `&category=${category}` : "";
      });
      const modeFetch = (() => {
        if(role === "admin")
        {
          return ""
        }
        return mode !== "" ? `&mode=${mode}` : "";
      });
      console.log(accesstoken)
      return await fetch(
        `${import.meta.env.VITE_BASE_URL}announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`,
        {
          headers: {
            Authorization: `${accesstoken}`,
          },
        }
      );
         
    } catch (err) {
        console.log(err);
      alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
      // window.location.reload();
    }
  };


  export const fetchCate = async() =>{
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`,
      {
        headers: {
          Authorization: `${accesstoken}`,
        },
      });
      if (response.status === 200) {
        return await response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
    } catch (err) {
      throw err;
    }
  }

  export const fetchCountParam = async(route,count) =>{
        return await fetch(
          `${import.meta.env.VITE_BASE_URL}announcements/${route}?count=${count}`,
          {
            headers: {
              Authorization: `${accesstoken}`,
            },
          })
  }


  export const fetchCateForMod = async() =>{
    return fetch(`${import.meta.env.VITE_BASE_URL}categories`,
    {
      headers: {
        Authorization: `${accesstoken}`,
      },
    });
  }

  export const fetchCreate = async(sendPackage) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements`,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(sendPackage),
      }
  );
  }

  export const fetchCreateUser = async(sendPackage) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}users`,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(sendPackage),
      }
  );
  }

  export const fetchUpdate = async (sendPackage, route) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements/${route.params.id}`,
      {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(sendPackage),
      }
  );
  }

  export const fetchUpdateUser = async (sendPackage, route) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}users/${route.params.id}`,
      {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(sendPackage),
      }
  );
  }


  export const fetchShowEdit = async(route) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements/${route}`
  );
  }


  export const fetchDelete = async (id) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}announcements/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
  }


  export const fetchDeleteUser = async (id) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}users/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
  }


  export const fetchUser = async () =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}users`
  );
  }

  export const fetchUserEdit = async(route) =>{
    return await fetch(
      `${import.meta.env.VITE_BASE_URL}users/${route}`
  );
  }

  export const fetchMatch = async (sendData) =>{
    return await fetch(`${import.meta.env.VITE_BASE_URL}users/match`,
    {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(sendData),
  })
  }
  export const fetchCreateToken = async (sendData) =>{
    return await fetch(`${import.meta.env.VITE_BASE_URL}token`,
    {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(sendData),
  })
  }
  // export default fetched_api;



