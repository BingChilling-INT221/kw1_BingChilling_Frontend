const fetched_api = async ( role,category, mode, page, pageSize) => {
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
      return await fetch(
          `${import.meta.env.VITE_BASE_URL}announcements/pages?${modeFetch()}&page=${page}&size=${pageSize}${selectCategory()}`
      );
    } catch (err) {
        console.log(err);
      alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
    //   window.location.reload();
    }
  };

  export default fetched_api;