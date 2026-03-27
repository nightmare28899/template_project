import useLogin from "@/hooks/auth/useLogin";
import useRegister from "@/hooks/auth/useRegister";
import useRecoverPassword from "@/hooks/auth/useRecoverPassword";
import useFormRecoverPassword from "@/hooks/auth/useFormRecoverPassword";
import useFetch from "@/hooks/useFetch";
import useMenuComponent from "@/hooks/useMenuComponent";
import {renewToken} from "@/hooks/useRenewToken";
import {useOptions} from "@/hooks/useOptions";
import useUser from "@/hooks/users/useUser";

export {
    useLogin,
    useRegister,
    useRecoverPassword,
    useFormRecoverPassword,
    useFetch,
    useMenuComponent,
    renewToken,
    useOptions,
    useUser,
};
