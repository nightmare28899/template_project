import API from './../utils/apiService';

 const config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
        }
//example
export async function getFicha() {
        return await API().get('projectsSheets');
}
