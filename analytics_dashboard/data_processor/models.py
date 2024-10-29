from django.db import models

class Dataset(models.Model):
    name = models.CharField(max_length=255)
    upload_date = models.DateTimeField(auto_now_add=True)

class ProcessedData(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    column1 = models.FloatField()
    column2 = models.FloatField()
