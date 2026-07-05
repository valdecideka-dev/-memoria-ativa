-- Memória Ativa Database Schema

CREATE TABLE IF NOT EXISTS memorias (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  criada_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizada_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  categoria VARCHAR(50),
  ativo BOOLEAN DEFAULT true
);

CREATE INDEX idx_memorias_usuario_id ON memorias(usuario_id);
CREATE INDEX idx_memorias_criada_em ON memorias(criada_em DESC);
CREATE INDEX idx_memorias_categoria ON memorias(categoria);

-- Enable Row Level Security
ALTER TABLE memorias ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own memorias" ON memorias
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own memorias" ON memorias
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own memorias" ON memorias
  FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own memorias" ON memorias
  FOR DELETE USING (auth.uid() = usuario_id);
