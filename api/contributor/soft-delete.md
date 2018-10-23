# Soft-Delete Flow

To `soft delete` an item, the API does the following:

1. Check if the collection has a status field
2. Check if the delta data has the status field (_Meaning the status was changed_)
3. Look for all status values with `soft_delete = true`
4. Checks if the new status value (_from delta data_) is one of status values from Step 3
5. Sets `action` to `SOFT_DELETE`