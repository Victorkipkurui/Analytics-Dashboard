import pandas as pd
from django.http import JsonResponse
from .models import Dataset, ProcessedData
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def upload_data(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        dataset = Dataset.objects.create(name=file.name)

        if file.name.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.name.endswith('.xlsx'):
            df = pd.read_excel(file)

        df = df.dropna()

        for _, row in df.iterrows():
            ProcessedData.objects.create(
                dataset=dataset,
                column1=row['column1'],
                column2=row['column2'],
            )

        return JsonResponse({"message": "File uploaded and data processed successfully"})
    return JsonResponse({"error": "Only POST method allowed"}, status=405)
