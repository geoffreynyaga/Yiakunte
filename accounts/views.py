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


class HomeView(TemplateView):
    template_name = "base.html"
