from django.shortcuts import redirect, render

# Create your views here.

from django.views.generic import TemplateView


from django.contrib.auth.mixins import LoginRequiredMixin

from django.shortcuts import render

# Create your views here.
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect

from django.views.generic.edit import CreateView
from django.views import generic

from rest_framework.response import Response

from .forms import LoginForm, PasswordResetForm, UserAdminCreationForm
from .models import User


class ReactView(TemplateView, LoginRequiredMixin):
    template_name = "ui/index.html"


# loginrequired decorator
def login_required(view):
    def wrapper_function(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view(request, *args, **kwargs)

        else:
            return redirect("/accounts/login/")

    return wrapper_function


# redirect page to home
@login_required
def home(request):
    if request.user.is_authenticated and request.user.is_lme:
        return render(request, "accounts/lme-home.html")
    # return redirect("/ui/lme/list/")
    return render(request, "accounts/lme-home.html")


class SignUp(CreateView):
    template_name = "accounts/register.html"
    form_class = UserAdminCreationForm
    success_url = "/"

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()
        return super(SignUp, self).form_valid(form)


# Login View Django
def login_view(request):
    if request.method == "POST":
        form = LoginForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("/")
    else:
        form = LoginForm()
    return render(request, "accounts/login.html", {"form": form})


class LoginView(generic.FormView):
    # form_class = AuthenticationForm
    form_class = LoginForm
    success_url = "/"
    template_name = "accounts/login.html"

    def form_valid(self, form):
        print("form validation in views")
        user = User.objects.get(phone_number=form.cleaned_data["phone_number"])

        from django.contrib.auth import authenticate, login, logout

        try:
            user = authenticate(
                phone_number=form.cleaned_data["phone_number"],
                password=form.cleaned_data["password"],
            )
            print(user, "user")

        except Exception as e:

            print(e)

        print(user, "user")
        if user is not None:
            if user.is_active:
                login(self.request, user)

        return super().form_valid(form)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/accounts/login")


class PasswordResetView(generic.FormView):
    form_class = PasswordResetForm
    success_url = "/accounts/login/"
    template_name = "accounts/password_reset.html"

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()

        # get  data from form
        print(dir(form))
        print((form.cleaned_data))

        phone_number = form.cleaned_data.get("phone_number")
        password = form.cleaned_data.get("password")
        print(phone_number, "should be phone number")
        print(password, "should be password")

        print("form validation in views")

        # >>> from django.contrib.auth.models import User
        # >>> u = User.objects.get(username='john')
        # >>> u.set_password('new password')
        # >>> u.save()

        try:
            user = User.objects.get(phone_number=form.cleaned_data.get("phone_number"))
            user.set_password(form.cleaned_data.get("password"))
            user.save()

        except Exception as e:
            print(e)
        return super().form_valid(form)
