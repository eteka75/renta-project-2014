import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Notification from '@/components/dashboard/Notification';
import { CartProvider } from '@/reducers/CartContext';
export default function GuestLayout({ auth = {}, children }) {
    return (
        <CartProvider>
            <div className="">
            <div className="absolute right-2 md:right-8 top-2">
                <ThemeSwitcher />                    
                </div>
                <Notification />
                <div className="max-w-screen-xl_ mx-auto dark:bg-gray-800  overflow-hidden">
                    {children}
                </div>
            </div>
        </CartProvider>
    );
}
