"""added subclass id to subclass feature

Revision ID: 149654a8464b
Revises: d269658ab12a
Create Date: 2024-10-12 00:52:28.717416

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '149654a8464b'
down_revision: Union[str, None] = 'd269658ab12a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('subclassFeature', sa.Column('subclass_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'subclassFeature', 'subclass', ['subclass_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'subclassFeature', type_='foreignkey')
    op.drop_column('subclassFeature', 'subclass_id')
    # ### end Alembic commands ###
