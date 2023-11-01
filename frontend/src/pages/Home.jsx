import React,{ useState} from "react";

export const Home = () => {
  const [ image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);

    try {
      console.log(formData);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle a successful upload response
        console.log('Image uploaded successfully.');
      } else {
        // Handle errors or failed upload
        console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};
