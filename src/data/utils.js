export function loadCourses(){
  try{
    const raw = localStorage.getItem('dh_course_v2');
    if(!raw) return null;
    return JSON.parse(raw);
  }catch(e){ return null; }
}
export function saveCourses(data){
  localStorage.setItem('dh_course_v2', JSON.stringify(data));
}
