from djoser import email
from djoser import utils
from djoser.conf import settings
from django.contrib.auth.tokens import default_token_generator


class ActivationEmail(email.ActivationEmail):
    template_name = 'user/ActivationEmail.html'

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        return context


class ConfirmationEmail(email.ConfirmationEmail):
    template_name = 'user/ConfirmationEmail.html'

class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'user/PasswordResetEmail.html'
    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
        return context

class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = 'user/PasswordChangedConfirmationEmail.html'
   