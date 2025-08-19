import API from './../utils/apiService';

const config = {
        headers: { 
                'Content-Type': 'multipart/form-data'
        }
}
//example
export async function createProject(body) {
        return await API().post('createProjects', body, config);
}
