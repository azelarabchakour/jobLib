from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('firstName', 'lastName', 'email', 'cv')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        #self.fields['cv'].required = True  # Example: Making the 'cv' field required
        # You can add more customizations or validations here if needed

    def save(self, commit=True):
        user = super().save(commit=False)
        # Add additional processing here if needed
        if commit:
            user.save()
        return user
