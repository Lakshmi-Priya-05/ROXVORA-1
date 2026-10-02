
import Button from '@components/common/Button/Button';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';

const SocialLogin = ({
  onGoogleLogin,
  onFacebookLogin,
  onGithubLogin,
  isLoading = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-neutral-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <FaGoogle className="w-5 h-5" aria-hidden="true" />
          <span>Google</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onFacebookLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <FaFacebookF className="w-5 h-5" aria-hidden="true" />
          <span>Facebook</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onGithubLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <FaGithub className="w-5 h-5" aria-hidden="true" />
          <span>GitHub</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;