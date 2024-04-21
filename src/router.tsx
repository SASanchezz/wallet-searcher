import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/not-found-apge";
import { HomePage } from "./pages/home-page";

export function UseRoutes (props: any) {
  return(
    <Routes>
      <Route path='/'               element={<HomePage />}/>
      
      <Route path='*'             element={<NotFoundPage />}/>
    </Routes>
  )
}
