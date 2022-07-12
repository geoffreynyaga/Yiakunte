# Create your models here.

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill
from phonenumber_field.modelfields import PhoneNumberField
from pilkit.processors import Thumbnail


class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None):
        """
        Creates and saves a User with the given phone_number and password.
        """
        if not phone_number:
            raise ValueError("Users must have an phone_number ")

        # user = self.model(
        #     email=self.normalize_email(email),
        # )

        user = self.model(phone_number=phone_number)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, phone_number, password):
        """
        Creates and saves a staff user with the given phone_number and password.
        """
        user = self.create_user(phone_number, password=password)
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password):
        """
        Creates and saves a superuser with the given phone_number and password.
        """
        user = self.create_user(phone_number, password=password)
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    phone_number = PhoneNumberField(unique=True)

    email = models.EmailField(
        verbose_name="email address", max_length=255, blank=True, null=True
    )
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)

    active = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    admin = models.BooleanField(default=False)  # a superuser
    # notice the absence of a "Password field", that's built in.

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS: list = []  # phone_number & Password are required by default.

    def get_full_name(self):
        # The user is identified by their phone_number address
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name and not self.last_name:
            return f"{self.first_name}"
        elif self.last_name and not self.first_name:
            return f"{self.last_name}"
        else:
            return str(self.phone_number)

    def get_short_name(self):
        # The user is identified by their phone_number
        if self.first_name and self.last_name:
            return f"{self.first_name}"
        elif self.first_name and not self.last_name:
            return f"{self.first_name}"
        elif self.last_name and not self.first_name:
            return f"{self.last_name}"
        else:
            return str(self.phone_number)

    def __str__(self):  # __unicode__ on Python 2
        # NOTE: Never change this as it is used in prompt_for_payment as an input
        return str(self.phone_number)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    @property
    def is_active(self):
        "Is the user active?"
        return self.active

    objects = UserManager()


def upload_profile_pic(instance, filename):
    return f"media/images/profiles/{instance.user.phone_number}/{filename}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    profile_pic = models.ImageField(upload_to=upload_profile_pic, blank=True, null=True)

    # image = models.ImageField(upload_to='images')
    # image_medium = ImageSpecField(source='image',
    #                               processors=[Thumbnail(200, 100)],
    #                               format='JPEG',
    #                               options={'quality': 60})
    profile_pic_thumbnail = ImageSpecField(
        # upload_to=upload_profile_pic,
        source="profile_pic",
        processors=[Thumbnail(100, 50)],
        format="JPEG",
        options={"quality": 60},
    )
    profile_pic_thumbnails = ProcessedImageField(
        upload_to=upload_profile_pic,
        # source="profile_pic",
        processors=[ResizeToFill(100, 50)],
        format="JPEG",
        options={"quality": 60},
        null=True,
        blank=True,
    )

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        print("created for the first time")
        UserProfile.objects.create(user=instance)
    else:
        print("Not first time creation")

class SMSToUser(models.Model):
    """Model definition for SMSToUser."""

    # TODO: find the length of the standard message we will be sending
    message = models.CharField(max_length=200)

    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sms_sent_to",
    )

    """
    NOTE: Added null=True because of the following error
    accounts.SMSToUser.receiver: (fields.E320) Field specifies on_delete=SET_NULL, but cannot be null.
        HINT: Set null=True argument on the field, or change the on_delete rule.
    """
    unregistered_receiver = PhoneNumberField(blank=True, null=True)

    is_registration = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.receiver} => {self.message}"


class SignUpPassword(models.Model):
    class Meta:
        verbose_name = "SignUpPassword"
        verbose_name_plural = "Sign Up Passwords"

    unregistered_user = PhoneNumberField()
    password = models.IntegerField()  # URGENT: put a max_value pf 9999?
    is_used = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Unicode representation of SignUpPassword."""
        return f"{self.unregistered_user}, {self.password}"
