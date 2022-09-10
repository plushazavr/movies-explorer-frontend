export const getResponse = (res) => {
  if (res.ok) {
    return(res.json());
  } else {
    return res.json()
      .then((err) => {
        const error = new Error(err.message);
        error.status = res.status;
        throw error;
      })
  }
};