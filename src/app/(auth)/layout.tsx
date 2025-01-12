
import PublicRoutes from "@/components/PublicRoutes";
export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <PublicRoutes>
               {children}
            </PublicRoutes>
        </div>
    );
}
